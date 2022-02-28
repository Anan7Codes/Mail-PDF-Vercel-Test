import { map } from 'modern-async'
var html_to_pdf = require('html-pdf-node');
const mail = require('@sendgrid/mail')

let amount, display
mail.setApiKey(process.env.SENDGRID_API_KEY)


let options = { format: 'A3' };

const Handler = async (req, res) => {
    if (req.method !== 'GET') {
        return res.send({ success: false, message: 'Wrong request made' })
    }
    if (req.method === 'GET') {
        console.log("Function called")
        const customerName = "Test User Name"
        const completed_orders = {
            count: 20
        }
        let coupons = [
            {
              product_id: 'ec3e130d-766e-4f3f-ace2-50ffee8ae458',
              product_coupons: [ 'KUKU0000012-1O', 'KUKU0000012-1D' ],
              product_qty: 1,
              product_price: 15,
              name: 'Zorno Pencil/AED 10,000 Cash'
            },
            {
              product_id: '998895d2-a6aa-404a-9f60-76880b8c2273',
              product_coupons: [
                'KUKU0000012-2O',
                'KUKU0000012-2D',
                'KUKU0000012-3O',
                'KUKU0000012-3D',
                'KUKU0000012-4O',
                'KUKU0000012-4D'
              ],
              product_qty: 3,
              product_price: 50,
              name: 'Zorno Pencil/AED 10,000 Cash'
            },
            {
              product_id: 'a415a869-6ebe-4d67-901c-b92b7e02dbac',
              product_coupons: [ 'KUKU0000012-5O', 'KUKU0000012-5D' ],
              product_qty: 1,
              product_price: 55,
              name: 'Zorno Pencil/AED 10,000 Cash'
            }
          ]

        const header = `
            <!DOCTYPE html>
            <html lang="en">
             <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Tailwind CSS Invoce </title>
                <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
            </head>
            <body>
                <div class="flex min-h-screen bg-gray-100">
                   <div class="w-full bg-white shadow-lg">
                      <div class="flex justify-between m-6">
                         <img src="https://i.postimg.cc/j2znKT6V/kukudealslogo-black.png"
                         class="flex items-center w-28 h-10 relative cursor-pointer" layout="fill" alt="kuku logo" />
                          <div class="">
                            <ul class="flex">
                                 <li class="flex flex-col ">
                            <span class="text-sm font-bold">
                                kukudeals Enterprises LLC
                            </span>
                            <span class="text-xs">
                                Address: Box Park, Al Wasl Rd, Dubai
                            </span>
                            <span class="text-xs">
                                TRN: 1008786483676343
                            </span>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li class="flex flex-col ">
                            <span class="text-base font-bold text-gray-700">
                                Tax Invoice
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <br />
            <div class="flex text-xs m-6 justify-between p-4">
                <div>
                    <div>
                        <h6 class="font-bold">Customer Name: <span class=" font-medium">${customerName}</span></h6>
                    </div>

                    <h6 class="font-bold">Address : <span class=" font-medium"> United Arab Emirates</span></h6>
                </div>
                <div class="">
                    <div>
                        <h6 class="font-bold">Invoice No : <span class=" font-medium">${String(completed_orders.count + 1).padStart(10, '0')}</span></h6>
                        <h6 class="font-bold">Invoice Date : <span class=" font-medium"> ${new Date().toLocaleString()}</span></h6>
                        <h6 class="font-bold">Order Status : <span class=" font-medium"> Completed</span></h6>
                    </div>
                </div>
            </div>
            <div class=" justify-center ">
                <div class="shadow m-6">
                    <table class=" table-fixed w-full">
                        <thead class=" bg-gray-50">
                            <tr>
                                <th class="w-24 border-collapse border border-slate-500  py-2 text-xs text-gray-500 ">
                                    Sr.No
                                </th>
                                <th class=" border-collapse w-52 border border-slate-500  py-2 text-xs text-gray-500 ">
                                    Product(s)
                                </th>
                                <th class=" border-collapse border border-slate-500  py-2 text-xs text-gray-500 ">
                                    Quantity
                                </th>
                                <th class=" border-collapse border border-slate-500  py-2 text-xs text-gray-500 ">
                                    UnitPrice
                                </th>
                                <th class=" border-collapse border border-slate-500  py-2 text-xs text-gray-500 ">
                                    Amount Excluding Tax
                                </th>
                                <th class=" border-collapse border border-slate-500  py-2 text-xs text-gray-500 ">
                                    Tax Rate %
                                </th>
                                <th class=" border-collapse border border-slate-500  py-2 text-xs text-gray-500 ">
                                    Tax Payable
                                </th>
                                <th class=" border-collapse border border-slate-500  py-2 text-xs text-gray-500 ">
                                    Amount Including Tax
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white text-xs text-center">`
        const body1 = await map(coupons, async (item, i) => {
            return (
                `<tr class="border-collapse border  border-slate-500 whitespace-nowrap ">
                    <td class="  border-collapse border border-slate-500  py-4 text-sm text-gray-500">
                        ${i + 1}
                    </td>
                    <td class="border-collapse border border-slate-500  py-4">
                        <div class=" text-gray-900">
                            ${item.name}
                        </div>
                    </td>
                    <td class=" border-collapse border border-slate-500   py-4 text-sm text-gray-500">
                    ${item.product_qty}
                    </td>
                    <td class=" border-collapse border border-slate-500   py-4">
                        AED${item.product_qty * item.product_price * 0.95}
                    </td>
                    <td class=" border-collapse border border-slate-500   py-4">
                    AED${item.product_price}
                    </td>
                    <td class=" border-collapse border border-slate-500   py-4">
                        5%
                    </td>
                    <td class=" border-collapse border border-slate-500   py-4">
                    AED${item.product_qty * item.product_price * 0.05}
                    </td>
                    <td class=" border-collapse border border-slate-500   py-4">
                    AED${item.product_qty * item.product_price}
                    </td>
                </tr>    
                `
                )
        })

        const footer = `
        <tr class="whitespace-nowrap border-2 border-black">
            <td class=" border-collapse border border-slate-500  py-4  text-gray-500">
                Grand Total
            </td>

            <td class=" border-collapse border border-slate-500  py-4 text-sm text-gray-500">
            </td>
            <td class=" border-collapse border border-slate-500  py-4">

            </td>
            <td class=" border-collapse border border-slate-500  py-4">
            </td>
            <td class=" border-collapse border border-slate-500  py-4">

            </td>
            <td class=" border-collapse border border-slate-500  py-4">
            </td>
            <td class=" border-collapse border border-slate-500  py-4">
        </tr>
            </tbody>
                </table>
                </div>
                </div>
                </div>
            </div>
            </body>
        </html>
            `
        const body2 = await map(coupons, async (items, index) => {
            display = items.product_coupons
            return (`
                    <div class="m-4 grid grid-cols-5 gap-1 pt-6 text-sm">
                    <div>Product Name : ${items.name}</div>
                    <div>Qty : ${items.product_qty}</div>
                    <div>Price : ${items.product_price}</div>
                    <div class = "border border-black text-center py-4">Coupon No: ${display}</div>
                    </div>`
                  )
             })
        let image = `<img class="items-center justify-center w-32 h-14" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ9hpbDkb5HdKE1RLtaMig_Gs24n8VsRIJ7KStu3T_1mX4kDaM23z2RXm8Z5Gd31QftaM&usqp=CAU" alt="HTML tutorial" style="width:200px;height:200px;border:0">`;
        let file = { content: header + body1 + footer + body2 }
        const pdfBuffer = await html_to_pdf.generatePdf(file, options)
        console.log("pdfBuffer",pdfBuffer)
        const data1 = {
            from: 'travo.socialmedia@gmail.com',
            personalizations: [
                {
                    to: ['anandhu@rough-paper.com'],  
                    subject: 'Order Confirmation'
                },
            ],
            content: [{ type: "text/html", value: image + header + body1 + footer + body2 },],
            attachments: [
                {
                    content: pdfBuffer.toString('base64'),
                    filename: 'invoice.pdf',
                    type: 'application/pdf',
                    disposition: 'attachment',
                    content_id: 'mytext',
                },
            ],
        }
        const resp = await mail.send(data1)
        console.log(resp)
        res.status(200).json({ status: 'OK' });  
    }
}

export default Handler