@echo off
echo Запуск локального веб-сервера...
echo.
echo Ваш IP адрес: 192.168.1.150
echo.
echo С других устройств откройте в браузере:
echo http://192.168.1.150:8000
echo.
echo Нажмите Ctrl+C для остановки сервера
echo.
python -m http.server 8000



