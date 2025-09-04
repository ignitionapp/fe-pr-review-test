export async function initMSW() {
  if (typeof window !== 'undefined' && import.meta.env.DEV) {
    const { worker } = await import('./browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    });
    console.log('🔧 MSW: Mock Service Worker started');
  }
}
