package com.vuthao.VNADCM.base;

import android.app.Activity;
import android.app.Application;
import android.content.ComponentCallbacks2;
import android.content.res.Configuration;
import android.os.Bundle;

public class AppLifeCycleHandler implements Application.ActivityLifecycleCallbacks, ComponentCallbacks2 {
    private AppLifeCycleCallback appLifeCycleCallback;
    private boolean appInForeground;

    public AppLifeCycleHandler(AppLifeCycleCallback appLifeCycleCallback) {
        this.appLifeCycleCallback = appLifeCycleCallback;
    }

    @Override
    public void onActivityResumed(Activity activity) {
        if (!appInForeground) {
            appInForeground = true;
            appLifeCycleCallback.onAppForeground();
        }
    }

    @Override
    public void onTrimMemory(int i) {
        if (i == ComponentCallbacks2.TRIM_MEMORY_UI_HIDDEN) {
            appInForeground = false;
            appLifeCycleCallback.onAppBackground();
        }
    }

    @Override
    public void onActivityCreated(Activity activity, Bundle bundle) {

    }

    @Override
    public void onActivityStarted(Activity activity) {
        Constants.isInBackground = false;
    }

    @Override
    public void onActivityPaused(Activity activity) {

    }

    @Override
    public void onActivityStopped(Activity activity) {
        Constants.isInBackground = true;
    }

    @Override
    public void onActivitySaveInstanceState(Activity activity, Bundle bundle) {

    }

    @Override
    public void onActivityDestroyed(Activity activity) {

    }

    @Override
    public void onConfigurationChanged(Configuration configuration) {

    }

    @Override
    public void onLowMemory() {

    }

    interface AppLifeCycleCallback {

        void onAppBackground();

        void onAppForeground();
    }
}
