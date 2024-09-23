import { Input, InputProps } from "~/components/ui/input"
import { Label } from "~/components/ui/label"

export function InputFile(props: InputProps) {
  return (
    <div className="grid w-full lg:max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input
        id="picture"
        type="file"
        className="file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:border file:border-solid file:border-blue-700 file:rounded-md border-blue-600"
        {...props}
      />
    </div>
  )
}