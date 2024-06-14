# microservice_lunch_order

## Step 1 創建 docker 映像

```
docker-compose build
```

## Step 2 運行 docker 容器

```
docker-compose up
```

## (Option) 修改 db IP

若遇上 db 連線錯誤，需要手動修改 db 連線 IP

進入 docker 查詢 db 容器 id

```
docker ps
```

查詢 db 容器 IP

```
docker inspect [db容器id]
```

修改後端服務.env，將 DB_HOST 替換成 db 的 Gateway
