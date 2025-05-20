import {IsBoolean} from 'class-validator'

export default class Promotions{

    @IsBoolean()
    acceptPromotions: boolean

    @IsBoolean()
    acceptPromotionsEmail: boolean

    @IsBoolean()
    acceptPromotionsCellPhone: boolean
}