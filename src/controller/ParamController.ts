import { Path, POST, Param, NotFoundError} from "../rest"

@Path("/api/param")
export class ParamController {

    @Path("/v1/create")
    @POST
    async paramValidation(
        @Param("paramNumber") paramNumber: number
    ) {
        if (paramNumber == 1) {
            throw new NotFoundError("this is error",12);
        }
    }
}