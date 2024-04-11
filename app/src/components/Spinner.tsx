import { FC } from 'react';
import { useUser } from './AuthContext';
import { Hourglass } from 'lucide-react';

interface SpinnerProps {
    loading?: boolean;
}

const Spinner: FC<SpinnerProps> = ({ loading }) => {
    const {isLoading} = useUser()
    const myLoad = loading ? loading : isLoading;
    return <div
        className={`${myLoad ? "flex" : "hidden"
            } fixed w-full h-screen text-center justify-center items-center text-white top-0 left-0 z-[2]`}
        style={{ background: "#0004" }}
    >
        <Hourglass color='#fff' className='animate-spin' />
    </div>;
};

export default Spinner;