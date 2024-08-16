import type { CustomAlertOptions } from './ZyToast/types';
import './ZyToast/ZyToast.scss';

export default defineNuxtPlugin(() => {
    // 自定义弹窗
    window.ZyToast = function(config: CustomAlertOptions) {
        const title = config.title || '来自知鸢宫的通知';
        const icon = config.icon || '';
        const body = config.text || '';
        const duration = config.duration || 3000;
        const type = config.type || 'info';
        const position = config.position || 'top-right';
        const callback = config.callback || null;


        let ZyToastParent;
        if (document.querySelector('#zy-toast-parent')) {
            ZyToastParent = document.querySelector('#zy-toast-parent');
        } else {
            ZyToastParent = document.createElement('div');
            ZyToastParent.id = 'zy-toast-parent';
            document.body.appendChild(ZyToastParent);
        }


        const ZyToastBox = document.createElement('div');
        ZyToastBox.classList.add('zy-toast-box');

        ZyToastBox.innerText = config.text || '';

        const closeButton = document.createElement('button');
        closeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M6.793 6.793a1 1 0 0 1 1.414 0L12 10.586l3.793-3.793a1 1 0 1 1 1.414 1.414L13.414 12l3.793 3.793a1 1 0 0 1-1.414 1.414L12 13.414l-3.793 3.793a1 1 0 0 1-1.414-1.414L10.586 12L6.793 8.207a1 1 0 0 1 0-1.414" clip-rule="evenodd"/></svg>`;
        closeButton.onclick = function() {
            const ZyToastParent = document.querySelector('#zy-toast-parent');
            if(ZyToastParent){
                document.body.removeChild(ZyToastParent);
            }
        };

        ZyToastBox.appendChild(closeButton);
        if(ZyToastParent){
            ZyToastParent.classList.add(position);
            ZyToastParent.appendChild(ZyToastBox);
            document.body.appendChild(ZyToastParent);
        }

    };
});
