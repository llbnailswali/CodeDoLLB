package com.codedo.app;

import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;
import androidx.core.view.WindowCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Capacitor renders edge-to-edge by default (the WebView extends behind
        // the status bar and navigation bar), which is why every screen needs
        // its own env(safe-area-inset-*) CSS padding to compensate -- easy to
        // miss on any one screen, as happened on the code editor's top toolbar.
        // Opting back into the classic "system bars reserve their own space"
        // behavior means the WebView's content area is automatically bounded
        // by both bars everywhere, with no per-screen CSS insets required.
        WindowCompat.setDecorFitsSystemWindows(getWindow(), true);
        disableOverscroll();
    }

    @Override
    public void onResume() {
        super.onResume();
        disableOverscroll();
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            disableOverscroll();
        }
    }

    private void disableOverscroll() {
        if (getBridge() != null && getBridge().getWebView() != null) {
            WebView webView = getBridge().getWebView();
            webView.setOverScrollMode(View.OVER_SCROLL_NEVER);
            webView.setVerticalScrollBarEnabled(false);
            webView.setHorizontalScrollBarEnabled(false);
        }
    }
}

