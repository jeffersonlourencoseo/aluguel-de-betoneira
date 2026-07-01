@echo off
cd /d "C:\Users\Jefferson\Desktop\SEO LOCAL\ALUGUEL DE BETONEIRA"

for /f "tokens=*" %%a in ('gh auth token') do set TOKEN=%%a

echo Enviando com autenticacao direta...
git -c http.extraheader="AUTHORIZATION: bearer %TOKEN%" push origin main

echo.
echo Pronto! Pressione qualquer tecla para fechar.
pause > nul
