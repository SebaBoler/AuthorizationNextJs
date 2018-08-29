import Head from 'next/head'

export default ({ children }) =>
<div>
    <Head>
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/antd/3.8.4/antd.min.css' />
    </Head>
    <style jsx global>{`
    body {
    }
  `}</style>
    {children}
</div>