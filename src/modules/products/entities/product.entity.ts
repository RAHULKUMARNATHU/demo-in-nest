import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne, } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        name:'prod_name',
        length: 250
    })
    prodName: string;

    @Column({
        name:'code',
        length: 25
    })
    code: string;

    @Column({
        unique:true,
        name:'image_url',
    })
    imageUrl: string;

    @Column({
        name:'sku',
        length: 25
    })
    sku: string;

    @Column({
        name:'price'
    })
    price: number;

    @Column({
        default: true,
        name:'is_active'
    })
    isActive: boolean;

    @Column({
        name:'category_id'
    })
    categoryId: number;

    // @ManyToOne((type) => Category, (category_id) => category.id)
    // categoryId: Category;
}
