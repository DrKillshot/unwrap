import Layout from '@theme/Layout';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock'

export default function GettingStarted() {
    return (
        <Layout title="Installation" description="Installation page for unwrap library">
            <Tabs
                defaultValue="apple"
                values={[
                    {label: 'npm', value: 'npm'},
                    {label: 'yarn', value: 'yarn'},
                    {label: 'pnpm', value: 'pnpm'},
                ]}>
                <TabItem value="npm">
                    <CodeBlock>
                        npm install @unnullable/unwrap
                    </CodeBlock>
                </TabItem>
                <TabItem value="yarn">This is an orange 🍊</TabItem>
                <TabItem value="pnpm">This is a banana 🍌</TabItem>
            </Tabs>
        </Layout>
    )
}