@echo off
cd /d "C:\Users\Jefferson\Desktop\SEO LOCAL\ALUGUEL DE BETONEIRA"

echo Cole o token que voce copiou do GitHub e aperte ENTER:
set /p TOKEN=

echo Configurando token...
git remote set-url origin https://%TOKEN%@github.com/jeffersonlourencoseo/aluguel-de-betoneira.git

echo Enviando...
git push origin main

echo.
echo Pronto! Pressione qualquer tecla para fechar.
pause > nul
