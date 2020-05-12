import { message } from 'antd';
import { translate, parseNodeBBArgsIfExist } from '_core/i18n';

export function showError(errorMessage) {
  console.log('showError errorMessage', errorMessage);
  const { textId, args } = parseNodeBBArgsIfExist(errorMessage);
  if (textId) {
    message.warning(translate(textId, args));
    return;
  }
  message.error(translate('technical-error'));
}
