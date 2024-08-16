import type { CustomAlertOptions } from './ZyToast/types';
import './ZyToast/ZyToast.scss';

export default defineNuxtPlugin(() => {
    // 自定义弹窗
    window.ZyToast = function(config: CustomAlertOptions) {
        const customAlertBox = document.createElement('div');
        customAlertBox.classList.add('custom-alert-box'); // 使用分离的样式

        customAlertBox.innerText = config.text || '';

        const closeButton = document.createElement('button');
        closeButton.innerText = 'Close';
        closeButton.onclick = function() {
            document.body.removeChild(customAlertBox);
        };

        customAlertBox.appendChild(closeButton);
        document.body.appendChild(customAlertBox);
    };
});
