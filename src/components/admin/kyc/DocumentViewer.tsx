// components/admin/KYC/DocumentViewer.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import Image from 'next/image'
import { ZoomIn, ZoomOut, RotateCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { KycDocumentType } from '@/types/kyc'


export default function DocumentViewer({ document }: { document: KycDocumentType }) {
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 3))
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5))
  const handleRotate = () => setRotation(prev => (prev + 90) % 360)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Aperçu du document</span>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleRotate}>
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center p-4">
          <div 
            className="relative w-full h-[500px]"
            style={{ transform: `scale(${scale}) rotate(${rotation}deg)` }}
          >
            <Image
              src={document.file}
              alt={`Document ${document.document_type.label}`}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {document.document_number && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium">Numéro de document:</h3>
            <p className="font-mono text-lg mt-1">{document.document_number}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}