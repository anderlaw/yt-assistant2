import { createConn } from "@/lib/db";
import { type NextRequest } from 'next/server'
type AddUserParams = {
    email: string
}
//登录
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get('email');
    const password = searchParams.get('password');

    const conn = await createConn();
    const result = await conn.query(`SELECT * from user WHERE email = '${email}' and password = '${password}'`);
    return new Response(JSON.stringify(result), {
        status: 200,
    })
}
// 注册
export async function POST(request: NextRequest, context: { params: AddUserParams }) {
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get('email');
    const password = searchParams.get('password');
    const conn = await createConn();
    const result0 = await conn.query(`SELECT * FROM user WHERE email = '${email}'`);

    if (result0[0].length) {
        //存在，视为登录
        const result1 = await conn.query(`SELECT * FROM user WHERE email = '${email}' and password = '${password}'`);
        if (result1[0].length) {
            return new Response(JSON.stringify({
                status: true
            }), {
                status: 200,
            })
        } else {
            return new Response(JSON.stringify({
                status: false
            }), {
                status: 200,
            })
        }
    } else {
        //视为注册
        const result1 = await conn.query(`INSERT IGNORE INTO user (email,password) VALUES('${email}','${password}')`);
        if (result1[0].affectedRows === 1) {
            return new Response(JSON.stringify({
                status: true
            }), {
                status: 200,
            })
        } else {
            return new Response(JSON.stringify({
                status: false
            }), {
                status: 500,
            })
        }

    }

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