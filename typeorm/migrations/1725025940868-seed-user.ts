import { MigrationInterface, QueryRunner } from "typeorm";
import bcrypt from 'bcryptjs';

export class Migration1725025940868 implements MigrationInterface {
    name = 'seed-user-1725025940868'
    userData = {
        name: 'Ahmed',
        email: 'ahmed@mail.com',
        password: 'pass1234',
    };

    public async up(queryRunner: QueryRunner): Promise<void> {
        const password = this.userData.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        await queryRunner.query(`
            INSERT INTO user (name, email, password)
            VALUES ('${this.userData.name}', '${this.userData.email}', '${hashedPassword}');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM user WHERE email = '${this.userData.email}';`);
    }

}
