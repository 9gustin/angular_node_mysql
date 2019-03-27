export class Game{
    id ?: string;
    name ?: string;
    description ?: string;
    image?:string;
    created_at ?:Date;

    constructor(id = '', name='', description='', image='', created_at=new Date()){
        this.id=id;
        this.name=name;
        this.description=description;
        this.image=image;
        this.created_at=created_at;
    }
}