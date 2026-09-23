/**
 * Safe, precise, AST-based writer for a lesson's code fields.
 *
 * Uses ts-morph (real TypeScript AST) rather than regex/string splicing so a
 * save can only ever touch the exact array/string node it targeted -- it
 * cannot accidentally corrupt an unrelated part of a 900+ line data file,
 * which is the failure mode a blind text replace would risk.
 */
import { Node, ObjectLiteralExpression, Project, SyntaxKind } from 'ts-morph';
import type { FieldPath } from './extractFields';

export interface FieldUpdate {
  path: FieldPath;
  kind: 'array' | 'string';
  newValue: string[] | string;
}

function getObjectLiteralProperty(obj: ObjectLiteralExpression, name: string): ObjectLiteralExpression {
  const prop = obj.getPropertyOrThrow(name);
  if (!Node.isPropertyAssignment(prop)) {
    throw new Error(`Property "${name}" is not a plain property assignment`);
  }
  const initializer = prop.getInitializerOrThrow();
  if (!Node.isObjectLiteralExpression(initializer)) {
    throw new Error(`Property "${name}" is not an object literal`);
  }
  return initializer;
}

function getPropertyInitializer(obj: ObjectLiteralExpression, name: string): Node {
  const prop = obj.getPropertyOrThrow(name);
  if (!Node.isPropertyAssignment(prop)) {
    throw new Error(`Property "${name}" is not a plain property assignment`);
  }
  return prop.getInitializerOrThrow();
}

function getArrayElementObject(obj: ObjectLiteralExpression, arrayPropName: string, index: number): ObjectLiteralExpression {
  const initializer = getPropertyInitializer(obj, arrayPropName);
  if (!Node.isArrayLiteralExpression(initializer)) {
    throw new Error(`Property "${arrayPropName}" is not an array literal`);
  }
  const element = initializer.getElements()[index];
  if (!element || !Node.isObjectLiteralExpression(element)) {
    throw new Error(`No object element at ${arrayPropName}[${index}]`);
  }
  return element;
}

function findLessonObjectLiteral(sourceFile: import('ts-morph').SourceFile, lessonId: string): ObjectLiteralExpression {
  for (const decl of sourceFile.getVariableDeclarations()) {
    const initializer = decl.getInitializer();
    if (!initializer || !Node.isObjectLiteralExpression(initializer)) continue;
    const idProp = initializer.getProperty('id');
    if (!idProp || !Node.isPropertyAssignment(idProp)) continue;
    const idInit = idProp.getInitializer();
    if (idInit && Node.isStringLiteral(idInit) && idInit.getLiteralValue() === lessonId) {
      return initializer;
    }
  }
  throw new Error(`No exported lesson object with id "${lessonId}" found in this file`);
}

function resolveTargetNode(lessonObj: ObjectLiteralExpression, path: FieldPath): Node {
  switch (path.stage) {
    case 'learn': {
      const learn = getObjectLiteralProperty(lessonObj, 'learn');
      return getPropertyInitializer(learn, path.prop);
    }
    case 'explore': {
      const explore = getObjectLiteralProperty(lessonObj, 'explore');
      const card = getArrayElementObject(explore, 'cards', path.cardIndex);
      return getPropertyInitializer(card, path.prop);
    }
    case 'predict': {
      const predict = getObjectLiteralProperty(lessonObj, 'predict');
      const question = getArrayElementObject(predict, 'questions', path.questionIndex);
      return getPropertyInitializer(question, path.prop);
    }
    case 'writeRun': {
      const writeRun = getObjectLiteralProperty(lessonObj, 'writeRun');
      return getPropertyInitializer(writeRun, path.prop);
    }
    case 'debug': {
      const debug = getObjectLiteralProperty(lessonObj, 'debug');
      return getPropertyInitializer(debug, path.prop);
    }
  }
}

export async function applyUpdatesToFile(filePath: string, lessonId: string, updates: FieldUpdate[]): Promise<void> {
  if (updates.length === 0) return;
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(filePath);
  const lessonObj = findLessonObjectLiteral(sourceFile, lessonId);

  for (const update of updates) {
    const target = resolveTargetNode(lessonObj, update.path);
    if (update.kind === 'array') {
      if (target.getKind() !== SyntaxKind.ArrayLiteralExpression) {
        throw new Error(`Target for ${JSON.stringify(update.path)} is not an array literal (found ${target.getKindName()})`);
      }
      target.replaceWithText(JSON.stringify(update.newValue));
    } else {
      if (target.getKind() !== SyntaxKind.StringLiteral) {
        throw new Error(`Target for ${JSON.stringify(update.path)} is not a string literal (found ${target.getKindName()})`);
      }
      target.replaceWithText(JSON.stringify(update.newValue));
    }
  }

  await sourceFile.save();
}
