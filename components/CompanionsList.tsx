import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn, getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
interface CompanionsListProps{
    title: string;
    companions: Companion[]; // Replace with a more specific type if available
    classNames?: string;
}

const CompanionsList = ({ title, companions, classNames} : CompanionsListProps) => {
  return (
    <article className={cn("companion-list", classNames)}>
        <h2 className="font-bold text-3xl">{title}</h2>
        <Table>
  <TableHeader>
    <TableRow>
      <TableHead className="text-lg w-2/3">Lessons</TableHead>
      <TableHead className='text-lg'>Subject</TableHead>
      <TableHead className='text-lg'>Duration</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {companions?.map(({ id, subject, topic, duration, name }) => (
        <TableRow key={id}>
        <TableCell className="font-medium">

            <Link href={`/companions/${id}`}>
            <div className="flex items-center gap-2">
                <div className="size-[73px] flex items-center justify-center rounded-lg max-md:hidden" style={{backgroundColor: getSubjectColor(subject)}}>
                    <Image src={`/icons/${subject}.svg`} alt={subject} width={35} height={35} />
                </div>
                <div className="flex flex-col gap-2">
                    <p className="font-bold text-2xl">{name}</p>
                    <p className="text-lg">{topic}</p>
                </div>
            </div>
            </Link>
        </TableCell>
        <TableCell>
            <div className="subject-badge w-fit"> {subject}</div>
            <div className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden" style={{backgroundColor: getSubjectColor(subject)}}>

            <Image src={`/icons/${subject}.svg`} alt={subject} width={18} height={18}  />
            </div>
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-2 w-full justify-end">
                    <p className="text-2xl">{duration} {' '}</p>
                    <span className="max-md:hidden" >mins</span>
                    <Image src="/icons/clock.svg" className="md:hidden" alt="Minutes" width={14} height={14} />
                </div>
            </TableCell>
        </TableRow>
    ))}
  </TableBody>
</Table>
    </article>
  )
}

export default CompanionsList