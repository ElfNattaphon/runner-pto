# RunPlanner Pro v3 — การแจ้งเตือน + กันสร้างแผนซ้ำ

- Toast แจ้งเตือนทุกหน้า (เข้าสู่ระบบ/สมัคร/บันทึกโปรไฟล์/สร้างแผน/ปฏิทิน)
- ช่องเวลาแบบ hh:mm:ss
- กันคำนวณเพซเพี้ยน (clamp + จัดลำดับโซน)
- ห้ามสร้างแผนซ้ำ: ถ้ามีอยู่แล้วจะตอบ 409 และมีปุ่มลบแผนเดิม
- ส่งออก .ics พร้อม type-safe
- bcrypt wrapper รองรับ ESM/CJS

## เริ่มต้น
```bash
yarn
cp .env.example .env
yarn prisma:generate
yarn prisma:migrate
yarn dev
```
