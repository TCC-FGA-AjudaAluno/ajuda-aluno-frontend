import React from "react";
import { CheckCircle, Star, Trophy, Medal, Flame, FileBadge, FileBadge2, Award, FileStack, Check, CheckCheck, BookOpenCheck, ListChecks } from "lucide-react";
import styles from './AchievementList.module.css'
import { getAchievements } from "../../helper/helper";


const iconComponents = {
  CheckCircle: <CheckCircle className={styles.iconGreen} size={32} />, 
  Flame: <Flame className={styles.iconRed} size={32} />,
  Star: <Star className={styles.iconYellow} size={32} />,
  Medal: <Medal className={styles.iconYellow} size={32} />, 
  Trophy: <Trophy className={styles.iconBlue} size={32} />, 
  FileBadge: <FileBadge className={styles.iconPurple} size={32} />, 
  FileBadge2: <FileBadge2 className={styles.iconOrange} size={32} />, 
  Award: <Award className={styles.iconTeal} size={32} />, 
  FileStack: <FileStack className={styles.iconIndigo} size={32} />, 
  Check: <Check className={styles.iconLime} size={32} />, 
  CheckCheck: <CheckCheck className={styles.iconCyan} size={32} />, 
  BookOpenCheck: <BookOpenCheck className={styles.iconAmber} size={32} />, 
  ListChecks: <ListChecks className={styles.iconLightBlue} size={32} />, 
};

const AchievementCard = ({ title, description, icon, unlocked }) => {
  return (
    <div className={unlocked ? `${styles.achievementCard} + ${styles.green}` : `${styles.achievementCard} + ${styles.gray}`}>
      <div className={styles.iconContainer}>{iconComponents[icon]}</div>
      <div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}

const AchievementList = () => {
  const [achievements, setAchievements] = React.useState([]);

  const fetchAchievements = async () => {
    getAchievements().then(res => {
      if (res.data && res.data.length > 0) {
        setAchievements(res.data.map((achievement) => {
          return {
            id: achievement.id,
            title: achievement.title,
            description: achievement.description,
            cover: achievement.cover,
            unlocked: achievement.unlocked,
            icon: achievement.cover,
          }
        }));
      }else{
        setAchievements([]);
      }
    });
  };

  React.useEffect(() => {
    fetchAchievements();
  }, []);

  return (
    <div className={styles.achievementList}>
      
      {achievements.map(({ id, title, description, icon, unlocked }) => (
        <AchievementCard key={id} title={title} description={description} icon={icon} unlocked={unlocked} />
      ))}
    </div>
  );
}

export default AchievementList;