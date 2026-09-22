import { verifyWorld16CoroutineLessons, world16CoroutineCaseCount } from '../src/utils/world16CoroutineLessons.test';
import { verifyWorld16Lesson1, lessonOneCases } from '../src/utils/world16Lesson1Coroutine.test';

await verifyWorld16Lesson1();
await verifyWorld16CoroutineLessons();
console.log(`World 16 coroutine audit passed: Lesson 1 (${lessonOneCases.length} cases) + Lessons 2-10/12 (${world16CoroutineCaseCount} cases).`);
