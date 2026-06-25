# Abdülsamed Topcu Portfolio

Vite + React portföy arayüzü ve ayrı Laravel API/yönetim panelinden oluşur.

## Yapı

- `/src`: React portföy arayüzü
- `/backend`: Laravel API, SQLite veri katmanı ve Blade yönetim paneli
- `GET /api/portfolio`: Yayındaki tüm portföy içeriği
- `POST /api/messages`: İletişim formu mesajları
- `/admin`: İçerik yönetim paneli

## Yerel geliştirme

Frontend:

```powershell
npm install
npm run dev
```

Backend:

```powershell
cd backend
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

Bu workspace içinde taşınabilir PHP çalışma zamanı `.tools/php/php.exe` altında bulunur. Dizin Git'e eklenmez; normal geliştirme ortamında sistem PHP/Composer kurulumu tercih edilir.

Frontend API adresi root `.env` içindeki `VITE_API_URL` ile, izin verilen frontend adresleri `backend/.env` içindeki `FRONTEND_URLS` ile yönetilir.

## Yönetim paneli

İlk kullanıcı `backend/.env` içindeki `ADMIN_EMAIL` ve `ADMIN_PASSWORD` değerlerinden seed edilir. Production ortamına geçmeden önce bu değerleri değiştirin ve yeniden çalıştırın:

```powershell
php artisan db:seed --force
```

Panelden profil/site metinleri, projeler, deneyimler, yetenek grupları, blog yazıları ve mesajlar yönetilir. Yalnızca `published` durumundaki kayıtlar public API'ye çıkar.

## Doğrulama

```powershell
npm run lint
npm run build
cd backend
php artisan migrate:fresh --seed
php artisan route:list
```
