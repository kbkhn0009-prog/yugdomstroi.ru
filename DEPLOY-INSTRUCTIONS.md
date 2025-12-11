# Инструкция по деплою на GitHub и Netlify

## Шаг 1: Загрузка на GitHub

### Вариант A: Через скрипт (Windows)
1. Запустите файл `deploy-to-github.bat`
2. Следуйте инструкциям на экране
3. При запросе введите логин и пароль GitHub (или Personal Access Token)

### Вариант B: Вручную через командную строку

Откройте PowerShell или CMD в папке проекта и выполните:

```bash
# 1. Инициализация Git (если еще не сделано)
git init

# 2. Добавление всех файлов
git add .

# 3. Создание коммита
git commit -m "Initial commit: Дом на ЮГЕ - сайт готов к деплою"

# 4. Переименование ветки в main
git branch -M main

# 5. Подключение к GitHub репозиторию
git remote add origin https://github.com/kbkhn0009-prog/yugdomstroi.ru.git

# 6. Загрузка кода
git push -u origin main
```

**Важно:** При первом push GitHub может запросить аутентификацию:
- Логин: ваш username на GitHub
- Пароль: используйте **Personal Access Token** (не обычный пароль!)

### Как создать Personal Access Token:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Выберите scope: `repo` (полный доступ к репозиториям)
4. Скопируйте токен и используйте его как пароль

---

## Шаг 2: Подключение к Netlify

1. Перейдите на https://app.netlify.com
2. Войдите через GitHub (рекомендуется)
3. Нажмите **"Add new site"** → **"Import an existing project"**
4. Выберите **"GitHub"**
5. Разрешите доступ к репозиториям
6. Найдите и выберите репозиторий **`yugdomstroi.ru`**

### Настройки деплоя:
- **Build command:** оставьте пустым
- **Publish directory:** `.` (точка)
- Нажмите **"Deploy site"**

---

## Шаг 3: Подключение домена

1. В панели Netlify выберите ваш сайт
2. Перейдите в **"Domain settings"**
3. Нажмите **"Add custom domain"**
4. Введите ваш домен (например, `yugdomstroi.ru`)
5. Netlify покажет DNS записи, которые нужно добавить:
   - **A запись:** IP адрес Netlify (будет показан)
   - **CNAME запись:** `www` → `ваш-сайт.netlify.app`
6. Добавьте эти записи у вашего регистратора домена
7. Подождите 5-60 минут для распространения DNS
8. Netlify автоматически выдаст SSL сертификат (HTTPS)

---

## Автоматический деплой

После подключения к Git, каждый раз когда вы делаете:
```bash
git add .
git commit -m "Описание изменений"
git push
```

Netlify автоматически обновит сайт в течение 1-2 минут!

---

## Полезные ссылки

- GitHub репозиторий: https://github.com/kbkhn0009-prog/yugdomstroi.ru
- Netlify Dashboard: https://app.netlify.com
- Документация Netlify: https://docs.netlify.com

---

## Решение проблем

### Ошибка при push: "Authentication failed"
- Используйте Personal Access Token вместо пароля
- Или настройте SSH ключи

### Сайт не обновляется после push
- Проверьте логи деплоя в Netlify
- Убедитесь, что файлы закоммичены и запушены

### Домен не подключается
- Проверьте DNS записи (может занять до 48 часов)
- Убедитесь, что домен не используется на другом хостинге

