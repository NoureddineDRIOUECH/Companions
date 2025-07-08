'use client'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {subjects} from "@/constants";
import { useRouter, useSearchParams} from "next/navigation";
import React from "react";

const SubjectFilter = () =>{
    const  router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('subject') || '';
    const [subject, setSubject] = React.useState(query);
    React.useEffect(() => {
        const updateRoute = async () => {
            try {
                if (subject === 'all') {
                    await router.push('/companions');
                } else if (subjects.includes(subject)) {
                    await router.push(`/companions?subject=${encodeURIComponent(subject)}`);
                }
            } catch (error) {
                console.error('Navigation failed:', error);
            }
        };

        updateRoute();
    }, [subject, router]);

    return <>
        <Select onValueChange={setSubject} value={subject}  >
            <SelectTrigger className="input capitalize">
                <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={'all'}>All subjects</SelectItem>
                {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject} className="capitalize">
                        {subject}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>

    </>
}
export default SubjectFilter;