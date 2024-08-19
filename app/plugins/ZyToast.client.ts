import type { CustomAlertOptions } from './ZyToast/types';
import './ZyToast/ZyToast.scss';

export default defineNuxtPlugin(() => {
    // 自定义弹窗
    window.ZyToast = function(config: CustomAlertOptions) {
        const synthesis = (config: CustomAlertOptions) => {
            const title = config.title || '来自知鸢宫的通知';
            const icon = config.icon || '';
            const text = config.text || '';
            const duration = config.duration || 1500;
            const type = config.type || 'info';
            const callback = config.callback || null;

            const ZyToastBox = document.createElement('div');
            ZyToastBox.classList.add('zy-toast-box');

            if(icon){
                const ZyToastIcon = document.createElement('div');
                ZyToastIcon.classList.add('zy-toast-icon');
                ZyToastIcon.innerHTML = icon;
                ZyToastBox.appendChild(ZyToastIcon);
            }

            const ZyToastBody = document.createElement('div');
            ZyToastBody.classList.add('zy-toast-body');
            ZyToastBody.classList.add(`zy-toast-${type}`);
            ZyToastBox.appendChild(ZyToastBody);

            const ZyToastTitle = document.createElement('div');
            ZyToastTitle.classList.add('zy-toast-title');
            ZyToastTitle.innerText = title;
            ZyToastBody.appendChild(ZyToastTitle);

            if(text){
                const ZyToastText = document.createElement('div');
                ZyToastText.classList.add('zy-toast-text');
                ZyToastText.innerText = text;
                ZyToastBody.appendChild(ZyToastText);
            }

            if(callback){
                ZyToastBox.onclick = function() {
                    callback();
                    const ZyToastParent = document.querySelector('#zy-toast-parent');
                    if(ZyToastParent){
                        ZyToastParent.removeChild(ZyToastBox);
                    }
                };
            }
            addToast(ZyToastBox);
            setTimeout(() => {
                removeToast(ZyToastBox);
            }, duration);
        }

        const addToast = (ZyToastBox:  HTMLDivElement) => {
            let ZyToastParent = null;
            if (document.querySelector('#zy-toast-parent')) {
                ZyToastParent = document.querySelector('#zy-toast-parent');
            } else {
                ZyToastParent = document.createElement('div');
                ZyToastParent.id = 'zy-toast-parent';
                document.body.appendChild(ZyToastParent);
            }
            if(ZyToastParent){
                // 进入动画
                ZyToastBox.classList.add('zy-toast-enter','zy-toast-enter-active');
                setTimeout(() => {
                    ZyToastBox.classList.remove('zy-toast-enter', 'zy-toast-enter-active');
                }, 400);
                ZyToastParent.appendChild(ZyToastBox);
            }
        }

        const removeToast = (ZyToastBox:  HTMLDivElement) => {
            const ZyToastParent = document.querySelector('#zy-toast-parent');
            if(ZyToastParent){
                // 退出动画
                ZyToastBox.classList.add('zy-toast-leave');
                setTimeout(() => {
                    ZyToastBox.classList.add('zy-toast-leave-active');
                }, 10);
                setTimeout(() => {
                    ZyToastBox.classList.remove('zy-toast-leave', 'zy-toast-leave-active');
                    ZyToastParent.removeChild(ZyToastBox);
                }, 400);
            }
        };




        synthesis(config);
    };
});
