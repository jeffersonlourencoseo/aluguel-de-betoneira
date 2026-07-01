@echo off
echo Limpando senha antiga...
cd /d "C:\Users\Jefferson\Desktop\SEO LOCAL\ALUGUEL DE BETONEIRA"
git config --local credential.helper ""
git config --global --unset credential.helper 2>nul
echo.
echo Tentando enviar com autenticacao nova...
gh auth setup-git
git push origin main
echo.
echo Pronto! Pressione qualquer tecla para fechar.
pause > nul
