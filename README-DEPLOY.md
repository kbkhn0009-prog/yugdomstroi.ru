# Инструкция по деплою на Netlify

## Способ 1: Drag & Drop (самый простой)

1. Перейдите на https://app.netlify.com
2. Зарегистрируйтесь или войдите (можно через GitHub)
3. На главной странице найдите секцию "Sites"
4. Перетащите всю папку проекта в область "Want to deploy a new site without connecting to Git? Drag and drop your site output folder here"
5. Netlify автоматически задеплоит ваш сайт
6. Вы получите адрес типа `random-name-123.netlify.app`

## Способ 2: Через Git (рекомендуется для автоматического деплоя)

### Шаг 1: Создайте Git репозиторий

```bash
git init
git add .
git commit -m "Initial commit"
```

### Шаг 2: Создайте репозиторий на GitHub

1. Перейдите на https://github.com
2. Создайте новый репозиторий (New repository)
3. Назовите его, например, `dom-na-yuge`
4. НЕ добавляйте README, .gitignore или лицензию
5. Скопируйте команды, которые GitHub покажет

### Шаг 3: Загрузите код на GitHub

```bash
git remote add origin https://github.com/ваш-username/dom-na-yuge.git
git branch -M main
git push -u origin main
```

### Шаг 4: Подключите к Netlify

1. Перейдите на https://app.netlify.com
2. Нажмите "Add new site" → "Import an existing project"
3. Выберите "GitHub"
4. Разрешите доступ к репозиториям
5. Выберите ваш репозиторий `dom-na-yuge`
6. Настройки деплоя:
   - Build command: оставьте пустым
   - Publish directory: `.` (точка)
7. Нажмите "Deploy site"

## Подключение кастомного домена

1. В панели Netlify выберите ваш сайт
2. Перейдите в "Domain settings"
3. Нажмите "Add custom domain"
4. Введите ваш домен (например, `domnayuge.ru`)
5. Netlify покажет DNS записи, которые нужно добавить:
   - A запись: `192.0.2.1` (IP адрес Netlify)
   - CNAME запись: `www` → `ваш-сайт.netlify.app`
6. Добавьте эти записи в настройках вашего домена (у регистратора)
7. Подождите 5-60 минут для распространения DNS
8. Netlify автоматически выдаст SSL сертификат

## Автоматический деплой

После подключения к Git, каждый раз когда вы делаете `git push`, Netlify автоматически обновит сайт.

## Полезные ссылки

- Netlify Dashboard: https://app.netlify.com
- Документация: https://docs.netlify.com


