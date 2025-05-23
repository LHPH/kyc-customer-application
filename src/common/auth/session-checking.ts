import JwtData from "../interfaces/jwt-data";

export default interface SessionChecking{

    sessionChecking(token: string): JwtData
}