import type { NextApiRequest, NextApiResponse } from 'next'
import https from 'https'

export default async function getFile(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { url } = req.query

  if (!url || typeof url !== 'string') {
    res.status(400).json({ error: 'URL이 필요합니다.' })
    return
  }

  https
    .get(url, (response) => {
      const data: Uint8Array[] = []
      response.on('data', (chunk) => {
        data.push(chunk)
      })

      response.on('end', () => {
        const buffer = Buffer.concat(data)
        const fileName = url.split('/').pop() || 'unknown_file'
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`)
        res.setHeader(
          'Content-Type',
          response.headers['content-type'] || 'application/octet-stream',
        )
        res.send(buffer)
      })
    })
    .on('error', (error) => {
      console.error(`Error fetching file from URL ${url}:`, error)
      res.status(500).json({ error: '파일을 가져오는 데 실패했습니다.' })
    })
}
