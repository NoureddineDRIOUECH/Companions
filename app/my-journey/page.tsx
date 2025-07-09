
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getUserCompanions, getUserSessions} from "@/lib/actions/companion.actions";
import Image from "next/image";
import CompanionsList from "@/components/CompanionsList";
const Profile = async () => {
    const user = await currentUser();
    if (!user) redirect('/sign-in');
    const companions = await getUserCompanions(user.id);
    const sessionHistory = await getUserSessions(user.id)
  return (
    <main className={'min-lg:w-3/4'}>
     <section className={'flex justify-between gap-4 max-sm:flex-col items-center'}>
         <div className={'flex items-center gap-4'}>
             <Image alt={user.firstName!} src={user.imageUrl} width={110} height={110} className={'rounded-border'}/>
             <div className={'flex flex-col'}>
                 <h1 className={'font-bold text-2xl'}>{user.firstName} {user.lastName}</h1>
                 <p className={'text-sm text-muted-foreground'}> {user.emailAddresses[0].emailAddress}</p>

             </div>
         </div>
         <div className={'flex gap-4'}>
            <div className={'border border-black rounded-lg p-3 gap-2 flex flex-col h-fit'}>
                <div className={'flex gap-2 items-center'}>
                    <Image alt={'checkMark'} src={'/icons/check.svg'} width={22} height={22} />
                    <p className={'text-2xl font-bold'}>{sessionHistory?.length}</p>
                </div>
                <div>Lessons completed</div>
            </div>
             <div className={'border border-black rounded-lg p-3 gap-2 flex flex-col h-fit'}>
                 <div className={'flex gap-2 items-center'}>
                     <Image alt={'checkMark'} src={'/icons/cap.svg'} width={22} height={22} />
                     <p className={'text-2xl font-bold'}>{companions?.length}</p>
                 </div>
                 <div>Comapnions created</div>
             </div>
         </div>
     </section>
         <Accordion type="multiple" >
             <AccordionItem value="recent">
                 <AccordionTrigger className={'text-2xl font-bold'}>Recent Sessions</AccordionTrigger>
                 <AccordionContent>
                     <CompanionsList title={'Recent Sessions'} companions={sessionHistory} />
                 </AccordionContent>
             </AccordionItem><AccordionItem value="companions">
                 <AccordionTrigger className={'text-2xl font-bold'}>My Companions {`(${companions?.length})`}</AccordionTrigger>
                 <AccordionContent>
                     <CompanionsList title={'My Companions'} companions={companions} />
                 </AccordionContent>
             </AccordionItem>
         </Accordion>

    </main>
  )
}

export default Profile