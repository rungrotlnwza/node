
# ใช้ Node.js LTS เป็น Base Image
FROM node:lts-slim

# ตั้ง Working Directory
WORKDIR /app

# คัดลอกไฟล์โค้ดทั้งหมดไปยัง Container
COPY . .

RUN npm install
# เปิดพอร์ต (ปรับตามแอปพลิเคชันของคุณ)
EXPOSE 3000

# คำสั่งเริ่มต้นสำหรับรันแอป
CMD ["npm", "start"]