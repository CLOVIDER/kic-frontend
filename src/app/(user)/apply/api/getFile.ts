import https from 'https'
import { NextApiRequest, NextApiResponse } from 'next'

export default function getFile(req: NextApiRequest, res: NextApiResponse) {
  const fileUrl = req.query.url

  if (typeof fileUrl !== 'string') {
    res.status(400).json({ error: 'URL is required as a query parameter' })
    return
  }

  https
    .get(fileUrl, (response) => {
      // Assuming the file is a binary, if it's not, the content type needs to be adjusted accordingly.
      response.setEncoding('binary')
      let data = ''

      response.on('data', (chunk) => {
        data += chunk
      })

      response.on('end', () => {
        const filename = fileUrl.split('/').pop() || 'default_filename'
        res.setHeader('Content-Type', 'application/octet-stream')
        res.setHeader(
          'Content-Disposition',
          `attachment; filename=${encodeURIComponent(filename)}`,
        )
        res.send(Buffer.from(data, 'binary'))
      })
    })
    .on('error', (err) => {
      console.error('Failed to download file:', err)
      res.status(500).json({ error: 'Failed to download file' })
    })
}
