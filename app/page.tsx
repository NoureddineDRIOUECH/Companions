
import CompanionCard from '@/components/CompanionCard';
import CompanionsList from '@/components/CompanionsList';
import CTA from '@/components/CTA';
import {getAllCompanions, getRecentSessions} from "@/lib/actions/companion.actions";
import {getSubjectColor} from "@/lib/utils";

const Page = async () => {
    const companions = await getAllCompanions({limit : 3});
    const recentSessions = await getRecentSessions(10);

  return (
    <main>
      <h1  > Popular Companions</h1>
      <section className='home-section'>
          {
              companions.map((companion) =>
               (
              <CompanionCard
              key={companion.id}
              id={companion.id}
              name={companion.name}
              topic= {companion.topic}
              subject= {companion.subject}
              duration={companion.duration}
          color={getSubjectColor(companion.subject)}
      />
              )
              )
          }


      </section>
      <section className='home-section'>
        <CompanionsList 
          title='Recently completed sessions'
          companions={recentSessions}
          classNames='w-2/3 max-lg:w-full'
        />
        <CTA />
      </section>
    </main>
  )
}

export default Page