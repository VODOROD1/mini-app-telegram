import { Telegraf, Markup } from "telegraf";

const token = '6846018098:AAFOP1EEjBg1zY_-GHTX8N2UvFHMA_azF60';
const webAppUrl = 'https://angular-tg-app-855e2.web.app';

let bot = new Telegraf(token);

// Здесь сообщаем боту - куда переходить при клике по главной кнопке снизу (MainButton)
bot.command('start', (ctx) => {
    ctx.reply(
        'Добро пожаловать. Нажмите на кнопку ниже чтобы запустить приложение',
        Markup.keyboard([
            Markup.button.webApp(
                'Отправить сообщение',
                webAppUrl + '/feedback'
            )
        ])
    )
})

// принимаем данные, которые были переданым нашим приложением через window.Telegram.WebApp.sendData()
bot.on(message('web_app_data'), async ctx => {
    const data = ctx.webAppData.data.json();
    ctx.reply(`Ваше сообщение: ${data.feedback}` ?? 'empty message')
});

// запускаем бота
bot.launch();
