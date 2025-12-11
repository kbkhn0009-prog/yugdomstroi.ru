@echo off
echo ========================================
echo Деплой сайта на GitHub
echo ========================================
echo.

echo [1/6] Инициализация Git...
git init
if errorlevel 1 (
    echo ОШИБКА: Git не установлен или не найден в PATH
    pause
    exit /b 1
)

echo.
echo [2/6] Добавление файлов...
git add .

echo.
echo [3/6] Создание коммита...
git commit -m "Initial commit: Дом на ЮГЕ - сайт готов к деплою"

echo.
echo [4/6] Переименование ветки в main...
git branch -M main

echo.
echo [5/6] Подключение к GitHub репозиторию...
git remote remove origin 2>nul
git remote add origin https://github.com/kbkhn0009-prog/yugdomstroi.ru.git

echo.
echo [6/6] Загрузка кода на GitHub...
echo ВНИМАНИЕ: Вам нужно будет ввести логин и пароль (или токен) GitHub
git push -u origin main

echo.
echo ========================================
echo Деплой завершен!
echo ========================================
echo.
echo Следующие шаги:
echo 1. Перейдите на https://app.netlify.com
echo 2. Add new site ^> Import from Git
echo 3. Выберите GitHub и ваш репозиторий yugdomstroi.ru
echo 4. Настройки:
echo    - Build command: (оставьте пустым)
echo    - Publish directory: . (точка)
echo 5. Нажмите Deploy site
echo.
pause

