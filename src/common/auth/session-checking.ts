import JwtData from "../interfaces/jwt-data";

export default abstract class SessionChecking{

    abstract sessionChecking(token: string): Promise<JwtData>
}