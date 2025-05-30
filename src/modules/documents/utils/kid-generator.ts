/*
 * Copyright 2024 RSC-Labs, https://rsoftcon.com/
 *
 * MIT License
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export const kidForOrder = (orderId: string, pattern = "#########") => {
    const digits = orderId.replace(/\D/g, "").slice(-pattern.length + 1);
    // Mod-11 check digit
    const weights = [2, 3, 4, 5, 6, 7];
    const sum = digits
        .split("")
        .reverse()
        .reduce((acc, d, i) => acc + Number(d) * weights[i % 6], 0);
    const remainder = sum % 11;
    const check = remainder === 0 ? 0 : 11 - remainder;
    return digits + check;
}; 