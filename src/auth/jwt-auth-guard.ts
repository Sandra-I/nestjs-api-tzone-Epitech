import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor(private jwtService: JwtService){super()}

    canActivate(context: ExecutionContext) {
        const args = context.getArgs();
        const responce: Response = args[0];
        const path = args[1].req.originalUrl;
        
        if(path == "/auth") return true;
        
        const rawAuthorization = responce.headers["authorization"]
        if(rawAuthorization){
            const AuthorizationData = rawAuthorization.split(" ");
            try {
                const token = this.jwtService.verify(AuthorizationData[1]);
                console.log(token, AuthorizationData[1])
                if(token) return super.canActivate(context);
            } catch (error) {
                console.log("Malformed token:", AuthorizationData[1])
                return false;
            }
        }

        return false;
    }
}