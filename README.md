# movies-explorer-api
Бэкенд для дипломного проекта.

Репозиторий: https://github.com/vlad-lis/movies-explorer-api

Адрес: https://api.movie-explorer.nomoredomains.monster/  
IP: 158.160.39.63

## Доступные запросы

* POST /signup  
создаёт пользователя с переданными в теле email, password и name

* POST /signin 
проверяет переданные в теле почту и пароль и возвращает JWT

* POST /signout  
JWT удаляется из cookies

* GET /users/me  
возвращает информацию о пользователе

* PATCH /users/me  
обновляет информацию о пользователе (email и имя)

* GET /movies  
возвращает все сохранённые текущим  пользователем фильмы
 
* POST /movies  
создаёт фильм с переданными в теле  
country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId

* DELETE /movies/_id  
удаляет сохранённый фильм по id
