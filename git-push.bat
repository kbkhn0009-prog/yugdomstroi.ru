@echo off
chcp 65001 >nul
echo ========================================
echo Деплой на GitHub
echo ========================================
echo.

if not exist .git (
    echo Инициализация Git...
    git init
)

echo Добавление файлов...
git add .

echo.
echo Создание коммита...
git commit -m "Initial commit: Дом на ЮГЕ - сайт готов к деплою"

echo.
echo Переименование ветки в main...
git branch -M main

echo.
echo Подключение к GitHub...
git remote remove origin 2>nul
git remote add origin https://github.com/kbkhn0009-prog/yugdomstroi.ru.git

echo.
echo ========================================
echo Загрузка на GitHub...
echo ========================================
echo ВНИМАНИЕ: Вам нужно будет ввести:
echo - Username: kbkhn0009-prog
echo - Password: ваш Personal Access Token (НЕ обычный пароль!)
echo.
echo Если у вас нет токена, создайте его здесь:
echo https://github.com/settings/tokens
echo.
pause

git push -u origin main

echo.
if %errorlevel% == 0 (
    echo ========================================
    echo УСПЕХ! Код загружен на GitHub!
    echo ========================================
    echo.
    echo Следующий шаг: подключите репозиторий к Netlify
    echo https://app.netlify.com
) else (
    echo ========================================
    echo ОШИБКА при загрузке
    echo ========================================
    echo.
    echo Возможные причины:
    echo 1. Неверный логин/пароль
    echo 2. Нужен Personal Access Token вместо пароля
    echo 3. Репозиторий не существует или нет доступа
)

echo.
pause

