// Импортируем хуки из библиотеки, которую мы установили ранее
import {
  useWebApp,
  useWebAppInitData,
  useWebAppMainButton
} from '@twa-dev/sdk';
import { useEffect } from 'react';

function App() {
  // 1. Получаем доступ к объекту SDK
  // Этот хук `useWebApp()` дает нам тот самый объект `window.Telegram.WebApp`
  const webApp = useWebApp();

  // 2. Получаем данные о пользователе
  // `initDataUnsafe` содержит информацию о пользователе, но ее нельзя использовать
  // для авторизации на бэкенде. Только для отображения в интерфейсе!
  const initData = useWebAppInitData();

  // 3. Получаем доступ к главной кнопке
  const mainButton = useWebAppMainButton();

  // Эта функция будет вызываться при нажатии на главную кнопку
  const onMainButtonClick = () => {
    // Отправляем данные боту. Пока просто строку, для примера.
    webApp.sendData('Hello from Mini App!');
  };

  // `useEffect` - это стандартный хук React. Код внутри него выполняется
  // один раз, когда компонент (наше приложение) загружается.
  useEffect(() => {
    // Говорим Telegram, что приложение готово к отображению
    webApp.ready();

    // Настраиваем главную кнопку
    mainButton.setText('ОТПРАВИТЬ ДАННЫЕ'); // Задаем текст
    mainButton.show(); // Делаем кнопку видимой

    // Добавляем обработчик клика на кнопку
    mainButton.on('click', onMainButtonClick);

    // Важно: при закрытии приложения нужно убирать обработчик,
    // чтобы избежать утечек памяти.
    return () => {
      mainButton.off('click', onMainButtonClick);
    };
  }, []); // Пустой массив зависимостей означает, что код выполнится один раз

  return (
    <div>
      <h1>Добро пожаловать в ваше первое TWA!</h1>
      {/* Проверяем, есть ли данные о пользователе, и выводим его имя */}
      {initData?.user && (
        <h2>
          Привет, {initData.user.firstName} {initData.user.lastName}!
        </h2>
      )}
      <p>Это базовый шаблон вашего фронтенд-приложения.</p>
    </div>
  );
}

export default App;
