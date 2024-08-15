import type { CustomAlertOptions } from './ZyAlert/types';
import './ZyAlert/ZyAlert.scss';

export default defineNuxtPlugin(() => {
    // 自定义弹窗逻辑，替换 window.alert
    window.ZyAlert = function(config: CustomAlertOptions) {
        // 自定义弹窗逻辑
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
