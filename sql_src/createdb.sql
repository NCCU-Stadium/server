CREATE TABLE "user_t" (
  "mail" varchar PRIMARY KEY,
  "role" varchar,
  "phone" varchar,
  "created_at" timestamp,
  "pass" varchar,
  "point" integer,
  "unpaid" integer
);

CREATE TABLE "purchaseHis_t" (
  "user_mail" varchar,
  "id" uuid,
  "time" timestamp,
  "price" integer,
  "product_id" uuid,
  "product_size" varchar,
  "product_color" varchar,
  "count" integer,
  PRIMARY KEY ("user_mail", "id")
);

CREATE TABLE "product_t" (
  "id" uuid PRIMARY KEY,
  "name" varchar,
  "brand" varchar,
  "price" integer,
  "desc" varchar,
  "imgurl" varchar
);

CREATE TABLE "productStore_t" (
  "product_id" uuid,
  "size" varchar,
  "color" varchar,
  "count" varchar,
  "id" uuid,
  "sold" integer,
  PRIMARY KEY ("product_id", "size", "color", "id")
);

CREATE TABLE "cart_t" (
  "user_mail" varchar,
  "id" uuid,
  "isdone" bool,
  PRIMARY KEY ("user_mail", "id")
);

CREATE TABLE "cart_contain_product" (
  "cart_id" uuid,
  "product_id" uuid,
  "size" varchar,
  "color" varchar,
  "count" integer,
  PRIMARY KEY ("cart_id", "product_id", "size", "color")
);

CREATE TABLE "course_t" (
  "id" uuid PRIMARY KEY,
  "timeslot" integer,
  "weekday" varchar,
  "coursetype" varchar,
  "duration" integer,
  "title" varchar,
  "weeks" integer,
  "max" integer,
  "content" varchar,
  "startday" date,
  "timeidx" integer[],
  "fee" integer
);

CREATE TABLE "subuser_t" (
  "user_mail" varchar,
  "avatar" varchar,
  "created_at" timestamp,
  "name" varchar,
  "gender" varchar,
  "birth" date,
  PRIMARY KEY ("user_mail", "name")
);

CREATE TABLE "user_take_course_t" (
  "user_mail" varchar,
  "user_name" varchar,
  "course_id" uuid,
  "leave_count" integer,
  PRIMARY KEY ("user_mail", "user_name", "course_id")
);

CREATE TABLE "coachIs_t" (
  "user_mail" varchar,
  "course_id" uuid,
  PRIMARY KEY ("user_mail", "course_id")
);

CREATE TABLE "table_t" (
  "timeidx" integer,
  "tabledate" date,
  "tableid" integer,
  PRIMARY KEY ("timeidx", "tabledate", "tableid")
);

CREATE TABLE "user_reserve_table_t" (
  "user_mail" varchar,
  "usedtableid" integer,
  "tabledate" date,
  "timeidx" integer,
  PRIMARY KEY ("user_mail", "usedtableid", "tabledate", "timeidx")
);

CREATE TABLE "course_use_table_t" (
  "courseid" uuid,
  "usedtableid" integer,
  "tabledate" date,
  "timeidx" integer,
  PRIMARY KEY ("courseid", "usedtableid", "tabledate", "timeidx")
);

-- purchaseHis_t
ALTER TABLE "purchaseHis_t" ADD FOREIGN KEY ("user_mail") REFERENCES "user_t" ("mail");
ALTER TABLE "purchaseHis_t" ADD FOREIGN KEY ("product_id") REFERENCES "product_t" ("id");
ALTER TABLE "purchaseHis_t" ADD FOREIGN KEY ("product_size") REFERENCES "productStore_t" ("size");
ALTER TABLE "purchaseHis_t" ADD FOREIGN KEY ("product_color") REFERENCES "productStore_t" ("color");

-- productStore_t
ALTER TABLE "productStore_t" ADD FOREIGN KEY ("product_id") REFERENCES "product_t" ("id");

-- cart_t
ALTER TABLE "cart_t" ADD FOREIGN KEY ("user_mail") REFERENCES "user_t" ("mail");

-- cart_contain_product_t
ALTER TABLE "cart_contain_product" ADD FOREIGN KEY ("cart_id") REFERENCES "cart_t" ("id");
ALTER TABLE "cart_contain_product" ADD FOREIGN KEY ("product_id") REFERENCES "product_t" ("id");

-- subuser_t
ALTER TABLE "subuser_t" ADD FOREIGN KEY ("user_mail") REFERENCES "user_t" ("mail");

-- user_take_course_t
ALTER TABLE "user_take_course_t" ADD FOREIGN KEY ("user_mail") REFERENCES "user_t" ("mail");
ALTER TABLE "user_take_course_t" ADD FOREIGN KEY ("user_name") REFERENCES "subuser_t" ("name");
ALTER TABLE "user_take_course_t" ADD FOREIGN KEY ("course_id") REFERENCES "course_t" ("id");

-- coachIs_t
ALTER TABLE "coachIs_t" ADD FOREIGN KEY ("user_mail") REFERENCES "user_t" ("mail");
ALTER TABLE "coachIs_t" ADD FOREIGN KEY ("course_id") REFERENCES "course_t" ("id");

-- user_reserve_table_t
ALTER TABLE "user_reserve_table_t" ADD FOREIGN KEY ("user_mail") REFERENCES "user_t" ("mail");
ALTER TABLE "user_reserve_table_t" ADD FOREIGN KEY ("usedtableid") REFERENCES "table_t" ("tableid");
ALTER TABLE "user_reserve_table_t" ADD FOREIGN KEY ("tabledate") REFERENCES "table_t" ("tabledate");
ALTER TABLE "user_reserve_table_t" ADD FOREIGN KEY ("timeidx") REFERENCES "table_t" ("timeidx");

-- course_use_table_t
ALTER TABLE "course_use_table_t" ADD FOREIGN KEY ("courseid") REFERENCES "course_t" ("id");
ALTER TABLE "course_use_table_t" ADD FOREIGN KEY ("usedtableid") REFERENCES "table_t" ("tableid");
ALTER TABLE "course_use_table_t" ADD FOREIGN KEY ("tabledate") REFERENCES "table_t" ("tabledate");
ALTER TABLE "course_use_table_t" ADD FOREIGN KEY ("timeidx") REFERENCES "table_t" ("timeidx");
