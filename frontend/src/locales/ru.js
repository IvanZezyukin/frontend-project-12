import removeChannelModal from "../components/RemoveChannelModal";
import renameChannelModal from "../components/RenameChannelModal";

export default {
  translation: {
    loginButton: 'Войти',
    logo: 'Hexlet Chat',
    logoutButton: 'Выйти',
    loginHeading: 'Войти',
    userNameLabel: 'Ваш ник',
    passwordLabel: 'Пароль',
    NoAccountAnswer: 'Нет аккаунта? ',
    signUp: 'Регистрация',
    messageCount_zero: 'сообщений',
    messageCount_one: 'сообщение',
    messageCount_few: 'сообщения',
    messageCount_many: 'сообщений',
    notFoundPage: {
      notFoundText: 'Такая страница не существует... Перейти ',
      homeLink: 'на главную',
    },
    signupPage: {
      signupHeading: 'Регистрация',
      usernameLabel: 'Имя пользователя',
      passwordLabel: 'Пароль',
      passwordConfirmationLabel: 'Подтвердите пароль',
      signupButton: 'Зарегистрироваться',
      validationRequired: 'Обязательное поле',
      validationMin3Max20: 'От 3 до 20 символов',
      validationMin6: 'Не менее 6 символов',
      validationPasswordRequired: 'Обязательное поле',
      validationMustMatch: 'Пароли должны совпадать',
      userAlreadyExists: 'Такой пользователь уже существует',
    },
    signinPage: {
      validationRequired: 'Обязательное поле',
      min6: 'Не менее 6 символов',
      wrongCredentials: 'Неверные имя пользователя или пароль',
    },
    addChannelModal: {
      validation: {
        required: 'Обязательное поле',
        notOneOf: 'Должно быть уникальным',
      },
      addChannel: 'Добавить канал',
      cansel: 'Отменить',
      send: 'Отправить',
      channelCreated: 'Канал создан',
    },
    alertAuth: {
      errorText: 'Неверные имя пользователя или пароль',
    },
    channels: {
      channels: 'Каналы',
      delete: 'Удалить',
      rename: 'Переименовать',
    },
    messageTextInput: {
      placeholder: 'Введите сообщение...',
    },
    removeChannelModal: {
      deleteChannel: 'Удалить канал',
      sure: 'Уверены?',
      canselBtn: 'Отменить',
      removeBtn: 'Удалить',
      channelRemovedToast: 'Канал удален',
    },
    renameChannelModal: {
      validation: {
        required: 'Обязательное поле',
        notOneOf: 'Должно быть уникальным',
      },
      title: 'Переименовать канал',
      canselBtn: 'Отменить',
      sendBtn: 'Отправить',
      channelRenamedToast: 'Канал переименован',
    },
  },
};
