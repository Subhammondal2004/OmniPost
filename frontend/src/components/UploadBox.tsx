import { motion } from "framer-motion"
import { UploadCloud, FileText, Trash2 } from "lucide-react"

interface UploadBoxProps {
  files: File[]
  onFileAdd: (files: File[]) => void
  onFileRemove: (index: number) => void
}

export function UploadBox({ files, onFileAdd, onFileRemove }: UploadBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (!selectedFiles) return
    onFileAdd(Array.from(selectedFiles))
  }

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40 transition-all duration-300">
      <div className="flex flex-col gap-4">
        <div className="rounded-[28px] border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center transition-all duration-300 hover:border-slate-300 hover:bg-slate-100">
          <label className="flex cursor-pointer flex-col items-center justify-center gap-3 text-slate-500">
            <UploadCloud className="h-12 w-12 text-sky-500" />
            <div>
              <p className="text-lg font-semibold text-slate-900">Drag & Drop Media</p>
              <p className="mt-1 text-sm text-slate-500">or browse files</p>
            </div>
            <input
              type="file"
              multiple
              hidden
              onChange={handleChange}
              accept="image/*,video/*"
            />
          </label>
        </div>

        {files.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 text-slate-700">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">{file.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{file.type || "Unknown format"}</p>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onFileRemove(index)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 transition-colors duration-300 hover:border-red-200 hover:bg-red-100 hover:text-red-500"
                  type="button"
                >
                  <Trash2 className="h-4 w-4" />
                </motion.button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
