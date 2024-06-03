import { createConn } from "@/lib/db";
import { type NextRequest } from 'next/server'
type AddUserParams = {
    email: string
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get('email');

    const conn = await createConn();
    const result = await conn.query("SELECT * from `user` WHERE `email` = '" + email + "'");
    return new Response(JSON.stringify(result), {
        status: 200,
    })
}
export async function POST(request: NextRequest, context: { params: AddUserParams }) {
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get('email');
    const password = searchParams.get('password');
    const conn = await createConn();
    const result = await conn.query("INSERT IGNORE INTO `user` (`email`) VALUES('" + email + "')");
    return new Response(JSON.stringify(result), {
        status: 200,
    })
}
// //获取用户信息
// router.get("/get-user", (req, res) => {
//     getUser(
//         {
//             email: req.query.email,
//         },
//         (data) => {
//             console.log(data);
//             res.json(data);
//         }
//     );
// });
  // Define params type according to your route parameters (see table below)