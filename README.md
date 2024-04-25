###  envs

```
DB_HOST
DB_USER
DB_DATABASE
DB_PORT
DB_PASSWORD
```

- conternedor de postgrest

```
docker run -d --name some-postgres -e POSTGRES_PASSWORD=123 -e PGDATA=/var/lib/postgresql/data/pgdata -e POSTGRES_DB=libros -p 5432:5432 postgres
```

- crear imagen dockerfile

```
docker build -t app-node .
```

- crear contenedro de la imagen

```
docker run --name app -p 3000:3000 -e DB_PORT=5432 -e DB_PASSWORD=123 -e DB_HOST=172.17.0.2 -e DB_USER=postgres -e DB_DATABASE=libros -d app-node
```

- ver host 

```
docker inspect some-postgres
```