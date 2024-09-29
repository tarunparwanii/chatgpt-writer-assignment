import './style.css';
import ReactDOM from 'react-dom/client';
import ChatWrapper from '@/components/ChatWrapper';

export default defineContentScript({
  matches: ['<all_urls>'],
  // set cssInjectionMode
  cssInjectionMode: 'ui',

  async main(ctx) {
    // UI Definition
    const ui = await createShadowRootUi(ctx, {
      name: 'linkedin-chat-extension',
      position: 'inline',
      onMount: (container) => {

        const app = document.createElement('div');
        container.append(app);

        // Root element to render the wrapper
        const root = ReactDOM.createRoot(app);
        root.render(<ChatWrapper />);
        return root;
      },
      onRemove: (root) => {
       
        root?.unmount();
      },
    });


    ui.mount();
  },
});