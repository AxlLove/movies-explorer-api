# Дипломный проект: «Movies Explorer» (Backend: NodeJS + MongoDB)

<div align="center" target="_blank" rel="noopener">
<a href="https://movies-explorer.kitaev.nomoreparties.sbs"><img src="https://github.com/AxlLove/Axllove/blob/master/src/movies-explorer.PNG" target="_blank" rel="noopener" alt="Movies Explorer"></a>
 <div align="center" target="_blank" rel="noopener">https://movies-explorer.kitaev.nomoreparties.sbs</div>
</div></br>

Данная дипломная работа реализована, для подтверждения и закрепления полученных знаний, в ходе учебного процесса на курсе «Фронтенд разработчик» платформы [Яндекс.Практикума](https://practicum.yandex.ru/ "Сервис онлайн-образования от Яндекса"). В ней я при помощи связки NodeJS + MongoDB реализовал полноценный API для работы [моего фронтенд приложения](https://github.com/AxlLove/movies-explorer-frontend).

**Реализованный функционал:**
- Регистрация/авторизация/редактирование пользователей (с валидацией всех полей)
- Добавление/удаление фильмов в базе (с валидацией всех полей)
- Логирование работы сервера

## Используемые навыки и технологии
* NodeJS
* MongoDB
* express.js
* Mongoose
* API
* CORS
* JWT

## Ссылка на API

https://api.diplom-me.nomoreparties.sbs

### Запуск

Используйте 'npm start' для запуска приложения

### Роуты:

### возвращает информацию о пользователе (email и имя)
GET /users/me

### обновляет информацию о пользователе (email и имя)
PATCH /users/me

### возвращает все сохранённые текущим  пользователем фильмы
GET /movies

### создаёт фильм с переданными в теле
### country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
POST /movies

### удаляет сохранённый фильм по id
DELETE /movies/_id 

### Регистрация пользователя 
POST /signup

### Авторизация пользователя
POST /signin
